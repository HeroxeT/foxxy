function  profileMainFun(){
    arrowProfile(1);
    if (lol_first_time){
        WatchLeague();
        leagueGamesMass = [];
        lol_first_time = false;
    }

}

//переключение профилей
function arrowProfile(id){
    let all = document.querySelectorAll('.profileListItem');
    let topPos = all[id].getBoundingClientRect().y - document.querySelector('.ProfileListMenu').getBoundingClientRect().y  + all[id].getBoundingClientRect().height/2 - 17;
    document.querySelector('.profileListArrow').style.top = topPos+"px";
    changeProfile(id);
}
function changeProfile(id){
    document.querySelectorAll('.ProfileScreen').forEach((el) =>{
        el.style.display = 'none';
        if (el.id === menuProf[id]){
            el.style.display = 'flex';
        }
    });
}
document.querySelectorAll('.profileListItem').forEach((el, i)=>{
    el.addEventListener('click', function (){
        arrowProfile(i);
    })
})

