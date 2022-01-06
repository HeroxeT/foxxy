
//выборка диалгов
function DialogEvent(){
    dialogs = document.querySelectorAll('.messageDialogs-item');
    for (let i = 0; i < dialogs.length; i++) {
        dialogs[i].addEventListener('click', function (e) {
            if (i !== dialogPoint)
                DialogChangeAnimation(i, e);
        })
    }
}


//изменение пинга диалога
function DialogChangeAnimation(dialogP, e = false) {
    dialogPoint = dialogP;
    for (let i = 0; i < dialogs.length; i++) {
        dialogs[i].style.backgroundColor = 'transparent';
    }
    dialogs[dialogP].style.backgroundColor = "rgba(28,28, 36, 1)";
    let xd = document.querySelector('.pingin');
    if (xd) {
        xd.remove();
    }
    let div = document.createElement('div');
    div.classList.add('pingin');
    if (e !== false) {
        div.style.left = e.clientX + "px";
        div.style.top = e.clientY + "px";
        div.style.backgroundColor = 'rgba(45,45, 57, 1)';
    } else {
        div.style.transform = 'rotate(-45deg)';
    }
    document.body.appendChild(div);
    setTimeout(() => {
        if (e !== false) {
            div.style.left = e.clientX - 20 + "px";
            div.style.top = e.clientY - 20 + "px";
            div.style.width = 40 + "px";
            div.style.height = 40 + "px";
        }
        setTimeout(() => {
            if (e !== false) {
                div.style.left = e.clientX - 15 + "px";
                div.style.top = e.clientY - 15 + "px";
                div.style.width = 30 + "px";
                div.style.height = 30 + "px";
                dialogAnim();
            } else {
                dialogAnim(true);
            }
            setTimeout(() => {
                let left = document.querySelector(".left__Panel").getBoundingClientRect().width + document.querySelector(".left__Panel").getBoundingClientRect().x - 30;
                div.style.left = left + "px";
                div.style.top = dialogs[dialogP].getBoundingClientRect().y + 10 + "px";
                div.style.width = 0 + "px";
                div.style.height = 0 + "px";
                div.style.borderRadius = "10px";
                div.style.border = '20px solid rgba(28,28, 36, 0)';
                div.style.borderRight = '20px solid rgba(45,45, 57, 1)';
                div.style.borderBottom = '20px solid rgba(45,45, 57, 1)';
                div.style.transform = 'rotate(-45deg)';
                setTimeout(() => {
                    div.style.backgroundColor = 'rgba(28,28, 36, 0)';
                }, 10);
            }, 170);
        }, 170);
    }, 10);
}

//изменение диалога в целом
function dialogAnim(first = false) {
    let dialog = document.querySelector(".dialog");
    let dialog1 = document.querySelector(".MessagesList");
    if (first) {
        dialog.style.width = "100%";
        dialog.style.marginLeft = "0px";
    } else {
        dialog1.style.overflow = "hidden";
        dialog.style.width = "0px";
        dialog.style.marginLeft = "100%";
        setTimeout(() => {
            dialog.style.width = "100%";
            dialog.style.marginLeft = "0px";
            dialog1.style.overflow = "auto";
        }, 301);
    }
}


