import React from "react";
import "./Modal.css";

const Modal9 = () => {
  return (
    <div className="modal-overlay overlay text-white">
      {/*<!-- Layer 1 -->*/}
      <div className="content-m hover:bg-yellow-300">
        {/* Layer 2 */}
        <div className="modal-content flex-container hover:bg-cyan-300">
          {/* Header*/}
          <div className="flex flex-col w-full text-center tooltip">
            <div className="truncate h-8 modal-header hover:bg-cyan-500">
              <span>
                選択したデータを削除します選択したデータを削除します選択したデータを削除します。選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します
              </span>
            </div>
            <div className="tooltiptext">
              選択したデータを削除します選択したデータを削除します選択したデータを削除します。選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します
            </div>
          </div>
          {/* Layer 3  */}
          <div className="flex justify-center items-center modal-body hover:bg-cyan-500">
            This is the Modal body
          </div>
          {/* Footer  */}
          <div
            style={{ height: "240px" }}
            className="flex flex-col w-full text-center hover:bg-cyan-600"
          >
            This is the Modal Footer
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal9;
