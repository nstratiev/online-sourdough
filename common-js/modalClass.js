export class ConfirmModal {
  constructor({ titleText, msgText, confirmText, cancelText, msgText2 }) {
    this.titleText = titleText;
    this.msgText = msgText;
    this.confirmText = confirmText;
    this.cancelText = cancelText;
    this.msgText2 = msgText2;
  }

  createAndOpen(onConfirm, onCancel) {
    this.modalElem = document.createElement('div');
    this.modalElem.classList.add('modal');
    setTimeout(() => {
      this.modalElem.classList.add('open');
    }, 400);

    const contentElem = document.createElement('div');
    contentElem.classList.add('content');
    this.modalElem.appendChild(contentElem);

    // Heading
    const titleElem = document.createElement('p');
    titleElem.classList.add('title-text');
    titleElem.textContent = this.titleText;
    contentElem.appendChild(titleElem);

    // Message
    const msgElem = document.createElement('p');
    msgElem.classList.add('msg-text');
    if (this.msgText2 !== undefined) {
      msgElem.innerHTML = this.msgText + '<br/>' + this.msgText2;
    } else {
      msgElem.textContent = this.msgText;
    }
    contentElem.appendChild(msgElem);

    // Cancel Button
    if (this.cancelText) {
      const cancelBtnElem = document.createElement('button');
      cancelBtnElem.classList.add('btn-cancel');
      cancelBtnElem.textContent = this.cancelText;
      cancelBtnElem.addEventListener('click', () => {
        onCancel('Cancelled');
        this.close();
      });
      contentElem.appendChild(cancelBtnElem);
      // cancelBtnElem.focus();
    }

    // Confirm Button
    if (this.confirmText) {
      const confirmBtnElem = document.createElement('button');
      confirmBtnElem.classList.add('btn-confirm');
      confirmBtnElem.textContent = this.confirmText;
      confirmBtnElem.addEventListener('click', () => {
        onConfirm('Confirmed');
        this.close();
      });
      contentElem.appendChild(confirmBtnElem);
    }

    document.body.appendChild(this.modalElem);

    const cancelBtn = document.querySelector('.btn-cancel');
    if (cancelBtn) {
      cancelBtn.focus();
    } else {
      document.querySelector('.btn-confirm').focus();
    }
  }

  open() {
    return new Promise((resolve, reject) => {
      this.createAndOpen(resolve, reject);
    });
  }

  close() {
    this.modalElem.classList.remove('open');
    setTimeout(() => {
      document.body.removeChild(this.modalElem);
    }, 400);
  }
}
