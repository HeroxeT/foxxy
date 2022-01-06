//полная загрузка страницы
document.addEventListener('DOMContentLoaded', function () {
    if (!debug){
        let win = document.body.children[document.body.children.length-1];
        win.remove();
    }
    setTimeout(()=>{
        document.querySelector('.mainLoading').classList.add("noneVis");
        document.querySelector('.loginScreen').classList.remove("noneVis");
        setTimeout(() => {
            loadAnimation();
        }, 100);
    },1000);

});

//загрузка анимаций
function loadAnimation() {
    document.querySelector(".flightAuthScreen").style.top = innerHeight * 0.2 + 20 + "px";
    document.querySelector(".flightAuthScreen").style.left = '110px';
    document.querySelector(".videoBackground").play();
    particlesJS("particles-js", canvasInfo);
    setTimeout(() => {
        let height = innerHeight * 0.6;
        if (innerHeight * 0.6 < 600){
            height = 600;
        }
        document.querySelector('.authorizationScreen').style.height = height + "px";
        document.querySelector(".logoLogin").style.left = 'calc(50px + 25vw/4 )';
    }, 100);
}


//инпуты
let allInputs = document.querySelectorAll('.inputsForLogin').forEach((el) => {
    setTimeout(() => {
        checkInp(el);
    }, 200);
    el.addEventListener('focus', function () {
        let text = el.parentElement.querySelector('.textForInputs');
        text.style.top = "50px";
    });
    el.addEventListener('blur', function () {
        checkInp(el);
    });

});
function checkInp(el) {
    let text = el.parentElement.querySelector('.textForInputs');
    let vaLinp = el.value.replace(/\s/g, '');
    if (vaLinp !== "") {
        text.style.top = "50px";
    } else {
        text.style.top = "20px";
    }
}



//кнопка на регистрацию
document.querySelector('#toRegScreen').addEventListener('click', function () {
    let screen = document.querySelector('.authorizationScreen');
    screen.style.transition = '0.5s';
    setTimeout(() => {
        document.querySelector('.authorizationForm').style.opacity = '0';
        document.querySelector('.registrationForm').classList.remove('noneVis');
        setTimeout(() => {
            document.querySelector('.authorizationForm').classList.add('noneVis');
            screen.style.transition = '0.2s';
            screen.style.marginTop = '0';
            let height = innerHeight * 0.6;
            if (innerHeight * 0.6 < 600){
                height = 600;
            }
            screen.style.height = height + "px";
            document.querySelector(".logoLogin").style.top = '20px';
            setTimeout(() => {
                document.querySelector(".logoLogin").style.transform = 'rotate(16deg)';
                document.querySelector('.registrationForm').style.opacity = '1';
                setTimeout(() => {
                    document.querySelector(".logoLogin").style.transform = 'rotate(-16deg)';
                    setTimeout(() => {
                        document.querySelector(".logoLogin").style.transform = 'rotate(0deg)';
                    }, 100);
                }, 100)
            }, 100);
        }, 400);
    }, 100);


});
//кнопка на авторизацию
document.querySelector('#toAuthScreen').addEventListener('click', function () {
    let screen = document.querySelector('.authorizationScreen');
    screen.style.transition = '0.5s';
    setTimeout(() => {
        document.querySelector('.registrationForm').style.opacity = '0';
        document.querySelector('.authorizationForm').classList.remove('noneVis');
        setTimeout(() => {
            document.querySelector('.registrationForm').classList.add('noneVis');
            document.querySelector('.authorizationForm').style.opacity = '1';
            screen.style.transition = '0.2s';
            screen.style.marginTop = innerHeight * 0.2 + "px";
            let height = innerHeight * 0.3;
            if (innerHeight * 0.3 < 300){
                height = 300;
            }
            screen.style.height = height + "px";
            setTimeout(() => {
                document.querySelector(".logoLogin").style.transform = 'rotate(8deg)';
                setTimeout(() => {
                    document.querySelector(".logoLogin").style.transform = 'rotate(-8deg)';
                    setTimeout(() => {
                        document.querySelector(".logoLogin").style.top = 'calc(20vh + 20px)';
                        document.querySelector(".logoLogin").style.transform = 'rotate(0deg)';
                    }, 50);
                }, 50)
            }, 50);
        }, 400);
    }, 100);
});

//кнопка авторизации
document.querySelector('#loginInSus').addEventListener('click', function () {
    document.querySelector('.mainLoading').classList.remove("noneVis");
    document.querySelector('.loginScreen').classList.add("noneVis");
    setTimeout(() => {
        document.querySelector('.mainLoading').classList.add("noneVis");
        document.querySelector('.mainScreen').classList.remove("noneVis");
        setTimeout(() => {
            AuthorizationAnimScreen();
        }, 100);
    }, 1000);
})

//авторизация и тд
function AuthorizationAnimScreen() {
    token = '123'; /////////////////////////////////////////////////////////////////////////////////////////////////////////
    let left = document.querySelector('.left_panel');
    DialogEvent();
    let content = document.querySelector('.main_content');
    content.style.width = 'calc(93vw - 50px)';
    // gameScrap(gamePrior);
    left.style.width = 'calc(7vw + 50px)';
    setTimeout(() => {
        content.style.borderRadius = "20px 0 0 20px";
        content.style.width = '93vw';
        left.style.width = '7vw';
        left.style.minWidth = '90px';
        setTimeout(() => {
            DialogChangeAnimation(dialogPoint);
        }, 350);
    }, 301);
}
