import { FaUser, FaIdCard, FaEnvelope, FaUserTag } from "react-icons/fa";

const ProfileComponent = ({ currentUser, setCurrentUser }) => {
  return (
    <div className="page-container  content-wrap p-5 ">
      {!currentUser && (
        <section class=" bg-gray-100">
          <div class="container">
            <div class="row flex-md-row flex-column-reverse">
              <div class="col-md-6  d-flex align-items-center">
                <h1>
                  獲取您的個人資料前，
                  <br className="d-none d-md-block" />
                  請先登錄。
                </h1>
              </div>
              <div class="col-md-6 mb-4 mb-md-0">
                <img
                  class="img-fluid"
                  alt="Teaching"
                  src="https://teach.udemy.com/wp-content/uploads/2021/07/teaching.jpg"
                />
              </div>
            </div>
          </div>
        </section>
      )}
      {currentUser && (
        <div className="container">
          <div className=" row d-flex flex-md-row align-items-center  ">
            <div className="col-md-4 p-1">
              <img
                class="img-fluid"
                alt="Teaching"
                src="https://s.udemycdn.com/teaching/support-1-2x-v3.jpg"
              />
            </div>
            <div className=" col-md-4">
              <div className="text-center mb-4 mb-md-0">
                <div className="profile-image-container mb-3">
                  <img
                    src="https://aadcdn.msauth.net/shared/1.0/content/images/picker_account_msa_3b879963b4f70829fd7a25cbc9519792.svg"
                    alt="Profile"
                    className="rounded-circle img-thumbnail"
                  />
                </div>
                <h3>{currentUser.user.username}，歡迎使用</h3>
                <p className="text-muted">{currentUser.user.role}</p>
              </div>

              <div>
                <table className="table" responsive borderless>
                  <tbody>
                    <tr>
                      <td>
                        <FaUser className="me-2 text-color" />
                        名稱
                      </td>
                      <td>{currentUser.user.username}</td>
                    </tr>
                    <tr>
                      <td>
                        <FaIdCard className="me-2  text-color" /> 用戶ID
                      </td>
                      <td>{currentUser.user._id}</td>
                    </tr>
                    <tr>
                      <td>
                        <FaEnvelope className="me-2  text-color" /> 電子郵件
                      </td>
                      <td>{currentUser.user.email}</td>
                    </tr>
                    <tr>
                      <td>
                        <FaUserTag className="me-2  text-color" /> 身份
                      </td>
                      <td>{currentUser.user.role}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="col-md-4 p-1">
              <img
                class="img-fluid"
                alt="Teaching"
                src="https://s.udemycdn.com/teaching/support-2-2x-v3.jpg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
