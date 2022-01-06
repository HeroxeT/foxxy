let debug = false; //false чтобы выключить счетчик фпс
let menu = ["user", "chat", "friends", "settings"];
let menuProf = ["prof", "lol", "dota", "csgo"];
let clikiticlick = false;
let dialogPoint = 0;
let token = '';
let gameMenu = false;
let menuPosition;
let dialogs;
// let gamePrior = 'lol_l';
let afk = false;
let video = {
    width: innerWidth,
    height: innerHeight,
}


window.addEventListener('focus', function () {
    document.title = 'Foxxy';
    document.querySelector(".videoBackground").play();
    afk = false
});
window.addEventListener('blur', function () {
    document.querySelector(".videoBackground").pause();
    afk = true;
    setTimeout(() => {
        if (afk) {
            document.title = 'Foxxy (AFK)';
        }
    }, 180000)
});

//анимация для меню переработать!
function menuAnimation(menupos) {
    if (menuPosition !== menupos) {
        nav_item_back.style.top = (-4 + menupos) * 55 + "px";
        menuPosition = menupos;
        let nav_items = document.querySelectorAll(".nav_item");
        let screenScroll = document.querySelector('.scrollElement');
        closeWin(menupos);
        if (menupos === 1 && token !== '') {
            DialogChangeAnimation(dialogPoint);
        } else if (menupos === 0 && token !== '') {
            profileMainFun();
        }
        for (let i = 0; i < menu.length; i++) {
            nav_items[i].style.backgroundImage = `url("assets/images/menuAssets/${menu[i]}.png")`;
        }
        nav_items[menupos].style.backgroundImage = `url("assets/images/menuAssets/${menu[menupos]}_l.png")`;
    }
}
function closeWin(id) {
    let xd = document.querySelector('.pingin');
    if (xd) {
        xd.remove();
    }
    for (let i = 0; i < 4; i++) {
        document.querySelector('#' + menu[i]).style.display = 'none';
    }
    document.querySelector('#' + menu[id]).style.display = 'flex';
}

menuAnimation(1);
let nav_items = document.querySelectorAll(".nav_item").forEach((el, i) => {
    el.addEventListener('click', () => {
        menuAnimation(i);
    })
});

//изменение видео
window.addEventListener('resize', function () {
    if (menuPosition === 1 && token !== '') {
        DialogChangeAnimation(dialogPoint);
    }
    if (window.innerHeight < 570) {
        console.log('123');
        document.querySelector('.videoBackground').style.width = '100vw';
        document.querySelector('.videoBackground').style.height = 'auto';
    } else {
        document.querySelector('.videoBackground').style.height = '100vh';
        document.querySelector('.videoBackground').style.width = 'auto';
    }
});


document.querySelector('.logo').addEventListener('click', function () {
    if (!clikiticlick && document.querySelector('.logo').style.animation !== "xd 1s") {
        clikiticlick = true;
        setTimeout(() => {
            clikiticlick = false

        }, 200);
    } else {
        document.querySelector('.logo').style.animation = "xd 1s";
        setTimeout(() => {
            document.querySelector('.logo').style.animation = "";
        }, 1000);
    }
});


//Дебаг консоль

if (debug) {
    let stats, update;
    stats = new Stats;
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.right = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
    update = function () {
        stats.begin();
        stats.end();
        requestAnimationFrame(update);
    };
    requestAnimationFrame(update);

}
