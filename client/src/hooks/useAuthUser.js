import { useEffect, useMemo, useState, useCallback } from "react";
import AuthService from "../services/auth.service";
import PermissionService from "../services/permission.service";

export default function useAuthUser(explicitUserLike) {
  // 狀態管理
  const [raw, setRaw] = useState(
    explicitUserLike ?? AuthService.getCurrentUser()
  );

  // 當 explicitUserLike 改變時，更新 raw
  useEffect(() => {
    if (explicitUserLike !== undefined) {
      setRaw(explicitUserLike);
    }
  }, [explicitUserLike]);

  // 使用 PermissionService 獲取用戶信息和權限
  const userInfo = useMemo(() => {
    return PermissionService.getUserInfo(raw);
  }, [raw]);

  const permissions = useMemo(() => {
    return PermissionService.getPermissions(raw);
  }, [raw]);

  // 業務邏輯方法
  const businessLogic = useMemo(() => {
    return {
      // 課程獲取
      getCoursesFetcher: () => PermissionService.getCoursesFetcher(raw),
      
      // 課程操作權限檢查
      getCourseActions: (course) => PermissionService.getCourseActions(raw, course),
      
      // 角色檢查方法
      hasRole: (role) => PermissionService.hasRole(raw, role),
      
      // 功能權限檢查
      canCreateCourse: () => PermissionService.canCreateCourse(raw),
      canEnrollCourse: () => PermissionService.canEnrollCourse(raw),
      canEditCourse: (course) => PermissionService.canEditCourse(raw, course),
      canDropCourse: () => PermissionService.canDropCourse(raw),
    };
  }, [raw]);

  // 控制方法
  const refresh = useCallback(() => {
    const currentUser = AuthService.getCurrentUser();
    setRaw(currentUser);
  }, []);

  const updateUser = useCallback((newUserData) => {
    setRaw(newUserData);
  }, []);

  // 跨分頁同步：監聽 localStorage 的變化
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "user") {
        try {
          setRaw(e.newValue ? JSON.parse(e.newValue) : null);
        } catch {
          setRaw(null);
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return {
    // 用戶基本信息
    ...userInfo,
    user: PermissionService.normalizeUser(raw),
    
    // 權限信息
    ...permissions,
    
    // 業務邏輯方法
    ...businessLogic,
    
    // 控制方法
    refresh,
    updateUser,
    setRaw, // 保留向後兼容
    
    // 原始數據（調試用）
    rawUser: raw,
  };
}
