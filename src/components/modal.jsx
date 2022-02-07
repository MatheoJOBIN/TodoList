const Modal = ({ handleChangeModal, deleteImg, handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                {children}
                <button type="button" onClick={deleteImg}>
                    Supprimer l'image
                </button>
                <input type="file" className="dlImg" id="modalImg" accept="image/png, image/jpeg" onChange={handleChangeModal}></input>
                <label htmlFor="modalImg" className="lblDlImg">Mettre une image d'illustration</label>
                <button type="button" onClick={handleClose}>
                    Close
                </button>
            </section>
        </div>
    );
};

export default Modal;