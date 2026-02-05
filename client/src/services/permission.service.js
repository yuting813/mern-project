import CourseService from './course.service';

class PermissionService {
  // 核心權限檢查方法
  static hasRole(user, role) {
    if (!user) return false;
    const normalizedUser = this.normalizeUser(user);
    return normalizedUser?.role === role;
  }

  static isInstructor(user) {
    return this.hasRole(user, 'instructor');
  }

  static isStudent(user) {
    return this.hasRole(user, 'student');
  }

  static isLoggedIn(user) {
    const normalizedUser = this.normalizeUser(user);
    return !!(normalizedUser?._id && normalizedUser?.role);
  }

  // 功能權限檢查
  static canCreateCourse(user) {
    return this.isInstructor(user);
  }

  static canEnrollCourse(user) {
    return this.isStudent(user);
  }

  static canEditCourse(user, course) {
    if (!this.isInstructor(user) || !course) return false;
    const normalizedUser = this.normalizeUser(user);
    return course.instructor?._id === normalizedUser?._id;
  }

  static canDropCourse(user) {
    return this.isStudent(user);
  }

  static canViewInstructorDashboard(user) {
    return this.isInstructor(user);
  }

  static canViewStudentDashboard(user) {
    return this.isStudent(user);
  }

  // 導航權限
  static canAccessCreateCoursePage(user) {
    return this.isInstructor(user);
  }

  static canAccessEnrollPage(user) {
    return this.isStudent(user);
  }

  static canAccessProfilePage(user) {
    return this.isLoggedIn(user);
  }

  // 用戶數據標準化（內建）
  static normalizeUser(userLike) {
    if (!userLike) return null;

    // 如果是嵌套結構 { user: {...} }，提取內層
    if (userLike.user && typeof userLike.user === 'object') {
      return userLike.user;
    }

    // 如果已經是扁平結構，直接返回
    if (userLike._id || userLike.id) {
      return userLike;
    }

    return null;
  }

  // 獲取用戶信息
  static getUserInfo(user) {
    const normalizedUser = this.normalizeUser(user);
    if (!normalizedUser) {
      return {
        uid: null,
        username: null,
        email: null,
        role: null,
        roleDisplayName: '未登入',
        isLoggedIn: false,
      };
    }

    return {
      uid: normalizedUser._id,
      username: normalizedUser.username,
      email: normalizedUser.email,
      role: normalizedUser.role,
      roleDisplayName: this.getRoleDisplayName(normalizedUser.role),
      isLoggedIn: true,
    };
  }

  static getRoleDisplayName(role) {
    switch (role) {
      case 'instructor':
        return '講師';
      case 'student':
        return '學生';
      default:
        return '未知';
    }
  }

  // 批量權限檢查（性能優化）
  static getPermissions(user) {
    const normalizedUser = this.normalizeUser(user);
    const isInstructor = this.isInstructor(normalizedUser);
    const isStudent = this.isStudent(normalizedUser);
    const isLoggedIn = this.isLoggedIn(normalizedUser);

    return {
      // 角色檢查
      isInstructor,
      isStudent,
      isLoggedIn,

      // 功能權限
      canCreateCourse: isInstructor,
      canEnrollCourse: isStudent,
      canDropCourse: isStudent,
      canViewInstructorDashboard: isInstructor,
      canViewStudentDashboard: isStudent,

      // 頁面訪問權限
      canAccessCreateCoursePage: isInstructor,
      canAccessEnrollPage: isStudent,
      canAccessProfilePage: isLoggedIn,
    };
  }

  // 新增：課程數據獲取邏輯（解決 getCoursesFetcher 問題）
  static getCoursesFetcher(user) {
    const normalizedUser = this.normalizeUser(user);

    if (this.isInstructor(normalizedUser)) {
      return (userId) => CourseService.getInstructorCourses(userId);
    }

    if (this.isStudent(normalizedUser)) {
      return (userId) => CourseService.getEnrolledCourses(userId);
    }

    // 未登入或未知角色
    return () => Promise.resolve([]);
  }

  // 新增：課程操作權限檢查
  static getCourseActions(user, course) {
    const normalizedUser = this.normalizeUser(user);

    return {
      canEdit: this.canEditCourse(normalizedUser, course),
      canDelete: this.canEditCourse(normalizedUser, course), // 同編輯權限
      canDrop: this.isStudent(normalizedUser),
      canEnroll: this.isStudent(normalizedUser),
    };
  }
}

export default PermissionService;
