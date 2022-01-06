let playerNowLeagueId = '0FFGcAyIzU7yHwC2eKewcHuc1vfBmTbzb3IisCYjyECVOHc';
let puuid = '';
let prom = false;
let mass = '';
let spellsSummonerLeague = ['', '', '', '', 'SummonerFlash', '', '', 'хил', '', '', '', 'SummonerSmite', 'SummonerTeleport', '', 'SummonerDot','32 - снежок'];
let lastgameLeague = 0;
let lol_first_time = true;
let leagueGamesMass;
document.querySelectorAll('.button_league').forEach((el, i) => {
    el.addEventListener('click', function () {
        let wid = document.querySelector('.league_buttons').getBoundingClientRect().width / 2
        document.querySelector('.buttonsBackground').style.left = i * wid + 'px';
        document.querySelectorAll('.league_rank_list_item').forEach((el, g) => {
            el.style.display = 'none';
            if (g === i) {
                el.style.display = 'flex';
            }
        })
    });
});
//
// document.querySelector('#LeagueCheckSummoner').addEventListener('click', async function () {
//     let nick = document.querySelector('#CheckSummoner').value.replace(" ", "%20");
//     document.querySelector('.loadingSummoner').style.display = 'block';
//     document.querySelector('.loadingSummoner').style.display = 'none';
//     let res = await fetch('/api/summonernick/' +nick , {
//         method: 'GET',
//     }).then(a => a.json());
//     if (await res) {
//         document.querySelector('.SummonerSettingsNick').innerHTML = await res.name;
//         document.querySelector('.SummonerSettingIcon').style.backgroundImage = 'url(//lolg-cdn.porofessor.gg/img/d/summonerIcons/11.23/64/'+await res.profileIconId+'.png)';
//         document.querySelector('.SummonerSettingIcon').addEventListener('load',  function (){
//             document.querySelector('.loadingSummoner').style.display = 'none';
//             document.querySelector('.loadingSummoner').style.display = 'flex';
//             // playerNowId = await res.id;
//         });
//
//     }
// })


async function WatchLeague() {
    LeagueRequestPlayer();
}

function stopImgLeague() {
    document.querySelector('.avatar_lol').style.backgroundImage = `none`;
    document.querySelector('.avaLoadLeague').style.display = 'flex';
    document.querySelectorAll('.league_rank_img').forEach(el => {
        el.style.backgroundImage = 'none'
    });
    document.querySelectorAll('.league_rank_loader').forEach(el => {
        el.style.display = 'flex'
    });
}


async function CreateGameLol(id) {
    let main = document.createElement('li');
    main.classList.add('gamesLeague_item');
    let leftBlock = document.createElement('div');
    leftBlock.classList.add('gamesLeague_info');
    let stats = document.createElement('div');
    let gameul = document.createElement('ul');
    gameul.classList.add('game_lol_allPersons');
    let allPers = await findPictureForGame(id, 0, gameul);
    let avatar = document.createElement('div');
    avatar.classList.add('game_pers_avatar_lol');
    let gametext = document.createElement('div');
    gametext.classList.add('game_lol_text');
    let textwin = document.createElement('div');
    textwin.classList.add('game_lol_winnable');
    let gametype = document.createElement('div');
    gametype.classList.add('game_lol_text_ingame');
    gametype.innerHTML = 'Обычная';
    let gametime = document.createElement('div');
    gametime.classList.add('game_lol_time');
    gametime.innerHTML = `${leagueGamesMass[id].duration} <span class="forBig">•</span> ${leagueGamesMass[id].dateStart}`;
    gametext.appendChild(textwin);
    gametext.appendChild(gametype);
    gametext.appendChild(gametime);
    if (leagueGamesMass[id].win) {
        avatar.classList.add('game_win');
        textwin.innerHTML = 'Победа';
        textwin.classList.add('rank_green');
    } else {
        avatar.classList.add('game_lost');
        textwin.innerHTML = 'Поражение';
        textwin.classList.add('rank_red');
    }
    let str = `http://ddragon.leagueoflegends.com/cdn/11.23.1/img/champion/${leagueGamesMass[id].champion[0]}.png`;
    let img = await fetch(str);
    if (await img) {
        avatar.style.backgroundImage = `url(${str})`;
        leftBlock.appendChild(avatar);
        leftBlock.appendChild(gametext);
        leftBlock.appendChild(stats);
    }
    stats.classList.add('game_lol_items_stat');
    let itemsUl = document.createElement('ul');
    itemsUl.classList.add('game_lol_items');
    let allItems = await findItemsForGame(id, 0, itemsUl);
    stats.appendChild(itemsUl);
    let statsUl = document.createElement('ul');
    statsUl.classList.add('game_lol_stats');
    let KDA = document.createElement('li');
    KDA.classList.add('game_lol_stats_kda');
    KDA.innerHTML = `${leagueGamesMass[id].kda[0]}/${leagueGamesMass[id].kda[1]}/${leagueGamesMass[id].kda[2]}`;
    let cs = document.createElement('li');
    cs.classList.add('game_lol_stats_cs');
    cs.innerHTML = leagueGamesMass[id].minions + 'cs';
    let gold = document.createElement('li');
    gold.classList.add('game_lol_stats_cs');
    gold.innerHTML = leagueGamesMass[id].gold + "g";
    let summ = document.createElement('li');
    let summonerspells = document.createElement('ul');
    summonerspells.classList.add('game_lol_stats_summonersSpells');
    let spells = findSpellsForGame(id, 0, summonerspells);
    summ.appendChild(summonerspells);
    statsUl.appendChild(KDA);
    statsUl.appendChild(cs);
    statsUl.appendChild(gold);
    statsUl.appendChild(summ);
    stats.appendChild(statsUl);
    main.appendChild(leftBlock);
    main.appendChild(gameul);
    //ура это говно работает
    if (await allPers && await allItems) {
        return main;
    }
}

document.querySelector('.gamesLeagueList').addEventListener('scroll', function (e) {
    if (this.scrollHeight - this.scrollTop < 810 && prom){
        prom = false;
        leagueGames();
    }
})
async function leagueGames(){
    let li = document.createElement('li');
    li.classList.add('gamesLeague_item_loading');
    li.innerHTML = '<svg version="1.1" id="L7" xmlns="http://www.w3.org/2000/svg"\n' +
        '                                     xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"\n' +
        '                                     y="0px" width="100px" height="120px"\n' +
        '                                     viewBox="0 0 100 100" enable-background="new 0 0 100 100"\n' +
        '                                     xml:space="preserve">\n' +
        ' <path fill="#fff" d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3\n' +
        '  c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z">\n' +
        '      <animateTransform\n' +
        '              attributeName="transform"\n' +
        '              attributeType="XML"\n' +
        '              type="rotate"\n' +
        '              dur="2s"\n' +
        '              from="0 50 50"\n' +
        '              to="360 50 50"\n' +
        '              repeatCount="indefinite"/>\n' +
        '  </path>\n' +
        '                                    <path fill="#fff" d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7\n' +
        '  c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z">\n' +
        '      <animateTransform\n' +
        '              attributeName="transform"\n' +
        '              attributeType="XML"\n' +
        '              type="rotate"\n' +
        '              dur="1s"\n' +
        '              from="0 50 50"\n' +
        '              to="-360 50 50"\n' +
        '              repeatCount="indefinite"/>\n' +
        '  </path>\n' +
        '                                    <path fill="#fff" d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5\n' +
        '  L82,35.7z">\n' +
        '      <animateTransform\n' +
        '              attributeName="transform"\n' +
        '              attributeType="XML"\n' +
        '              type="rotate"\n' +
        '              dur="2s"\n' +
        '              from="0 50 50"\n' +
        '              to="360 50 50"\n' +
        '              repeatCount="indefinite"/>\n' +
        '  </path>\n' +
        '</svg>';
    document.querySelector('.gamesLeagueList').appendChild(li);
    let data = new FormData();
    data.append('end', 10);
    data.append('start', lastgameLeague);
    data.append('id',   puuid);
    let res = await fetch('/api/gameleague', {
        method:"POST",
        body: data
    }).then( a=> a.json());
    if (await res){
        leagueGamesMass = await res;
        lengther(li);
    }
}
async function lengther(li) {
    let mass = [];
    for (let i =0; i < 10; i++) {
        let promise = await CreateGameLol(i);
        mass.push(await promise);
    }
    mass.forEach(el => document.querySelector('.gamesLeagueList').appendChild(el));
    lastgameLeague += 10;
    prom = true;
    li.remove();
}

async function findPictureForGame(id, person, container) {
    if (person < leagueGamesMass[id].persons.length) {
        let str = `http://ddragon.leagueoflegends.com/cdn/11.23.1/img/champion/${leagueGamesMass[id].persons[person]}.png`
        let img = await fetch(str);
        if (await img) {
            let li = document.createElement('li');
            li.classList.add("game_lol_allPersons_item");
            li.style.backgroundImage = `url(${str})`;
            container.appendChild(li);
            return Promise.resolve(findPictureForGame(id, person + 1, container));
        }
    } else {
        return Promise.resolve(true);
    }
}

async function findItemsForGame(id, item, container) {
    if (item < leagueGamesMass[id].item.length) {
        if (leagueGamesMass[id].item[item] === 0) {
            let li = document.createElement('li');
            li.classList.add("game_lol_allPersons_item");
            container.appendChild(li);
            return Promise.resolve(findItemsForGame(id, item + 1, container));
        } else {
            let str = `http://ddragon.leagueoflegends.com/cdn/11.23.1/img/item/${leagueGamesMass[id].item[item]}.png`
            let img = await fetch(str);
            if (await img) {
                let li = document.createElement('li');
                if (item === 6) {
                    li.classList.add("game_lol_items_item_low");
                } else {
                    li.classList.add("game_lol_items_item");
                }
                li.style.backgroundImage = `url(${str})`;
                container.appendChild(li);
                return Promise.resolve(findItemsForGame(id, item + 1, container));
            }
        }
    } else {
        return Promise.resolve(true);
    }
}

async function findSpellsForGame(id, sp, container) {
    if (sp < leagueGamesMass[id].summonerSpell.length) {
        if (sp === 0) {
            // let str = `http://lolg-cdn.porofessor.gg/img/d/perks/11.23/64/${leagueGamesMass[id].summonerSpell[sp]}.png`;
            // let img = await fetch(str);
            // if (await img) {
            let li = document.createElement('li');
            li.classList.add("game_lol_summ_perk");
            // li.style.backgroundImage = `url(${str})`;
            container.appendChild(li);
            return Promise.resolve(findSpellsForGame(id, sp + 1, container));
            // }
        } else {
            let id2 = spellsSummonerLeague[leagueGamesMass[id].summonerSpell[sp]];
            let str = `http://ddragon.leagueoflegends.com/cdn/11.23.1/img/spell/${id2}.png`;
            let img = await fetch(str);
            if (await img) {
                let li = document.createElement('li');
                li.classList.add("game_lol_summ_spell");
                li.style.backgroundImage = `url(${str})`;
                container.appendChild(li);
                return Promise.resolve(findSpellsForGame(id, sp + 1, container));
            }
        }
    } else {
        return Promise.resolve(true);
    }
}

//добавить динамическу загрузку контента
async function LeagueRequestPlayer() {
    stopImgLeague();
    let res = await fetch('api/playeridleague/' + playerNowLeagueId, {
        method: 'GET',
    }).then(a => a.json());
    if (await res) {
        let mass = JSON.parse(await res);
        console.log(mass);
        document.querySelector('.avatar_lol_nick').innerHTML = mass[0].name;
        document.querySelector('.avatar_lol_level').innerHTML = mass[0].summonerLevel + " уровень";
        let img = new Image();
        puuid = mass[0].puuid;
        leagueGames();
        img.src = `http://ddragon.leagueoflegends.com/cdn/11.23.1/img/profileicon/${mass[0].profileIconId}.png`;
        img.addEventListener('load', function () {
            document.querySelector('.avatar_lol').style.backgroundImage = `url(${this.src})`;
            document.querySelector('.avaLoadLeague').style.display = 'none';
        });

        if (mass[1].length === 2) {
            for (let i = 0; i < 2; i++) {
                if (mass[1][i].queueType === "RANKED_SOLO_5x5") {
                    let rankS = mass[1][i].tier[0] + mass[1][i].tier.slice(1).toLowerCase();
                    img = new Image();
                    img.src = `assets/images/League/Emblem_${rankS}.png`;
                    img.addEventListener('load', function () {
                        document.querySelector('.league_rank_img.solo').style.backgroundImage = `url(${this.src})`;
                        document.querySelector('.league_rank_loader.solo').style.display = 'none';
                    });
                    document.querySelector('.league_rank_name.solo').innerHTML = rankS + ' ' + mass[1][i].rank;
                    document.querySelector('.league_rank_games.solo').innerHTML = `<div class="rank_green">${mass[1][i].wins}</div>|<div class="rank_red">${mass[1][i].losses}</div>`;
                } else {
                    let rankS = mass[1][i].tier[0] + mass[1][i].tier.slice(1).toLowerCase();
                    img = new Image();
                    img.src = `assets/images/League/Emblem_${rankS}.png`;
                    img.addEventListener('load', function () {
                        document.querySelector('.league_rank_img.flex').style.backgroundImage = `url(${this.src})`;
                        document.querySelector('.league_rank_loader.flex').style.display = 'none';
                    });
                    document.querySelector('.league_rank_name.flex').innerHTML = rankS + ' ' + mass[1][i].rank;
                    document.querySelector('.league_rank_games.flex').innerHTML = `<div class="rank_green">${mass[1][i].wins}</div>|<div class="rank_red">${mass[1][i].losses}</div>`;
                }
            }
        } else if (mass.length === 0) {
            img = new Image();
            img.src = `assets/images/League/Unranked.png`;
            img.addEventListener('load', function () {
                document.querySelector('.league_rank_img.solo').style.backgroundImage = `url(${this.src})`;
                document.querySelector('.league_rank_loader.solo').style.display = 'none';
            });
            document.querySelector('.league_rank_name.solo').innerHTML = "Unranked";
            document.querySelector('.league_rank_games.solo').innerHTML = "";
            img = new Image();
            img.src = `assets/images/League/Unranked.png`;
            img.addEventListener('load', function () {
                document.querySelector('.league_rank_img.flex').style.backgroundImage = `url(${this.src})`;
                document.querySelector('.league_rank_loader.flex').style.display = 'none';
            });
            document.querySelector('.league_rank_name.flex').innerHTML = "Unranked";
            document.querySelector('.league_rank_games.flex').innerHTML = '';
        } else if (mass.length === 1) {
            if (mass[0].queueType === "RANKED_SOLO_5x5") {
                let rankS = mass[1][0].tier[0] + mass[1][0].tier.slice(1).toLowerCase();
                img.src = `assets/images/League/Emblem_${rankS}.png`;
                img.addEventListener('load', function () {
                    document.querySelector('.league_rank_img.solo').style.backgroundImage = `url(${this.src})`;
                    document.querySelector('.league_rank_loader.solo').style.display = 'none';
                });
                document.querySelector('.league_rank_name.solo').innerHTML = rankS + ' ' + mass[0].rank;
                document.querySelector('.league_rank_games.solo').innerHTML = `<div class="rank_green">${mass[1][0].wins}</div>|<div class="rank_red">${mass[1][0].losses}</div>`;
                img = new Image();
                img.src = `assets/images/League/Unranked.png`;
                img.addEventListener('load', function () {
                    document.querySelector('.league_rank_img.flex').style.backgroundImage = `url(${this.src})`;
                    document.querySelector('.league_rank_loader.flex').style.display = 'none';
                });
                document.querySelector('.league_rank_name.flex').innerHTML = "Unranked";
                document.querySelector('.league_rank_games.flex').innerHTML = '';
            } else {
                let rankS = mass[1][0].tier[0] + mass[1][0].tier.slice(1).toLowerCase();
                img = new Image();
                img.src = `assets/images/League/Emblem_${rankS}.png`;
                img.addEventListener('load', function () {
                    document.querySelector('.league_rank_img.flex').style.backgroundImage = `url(${this.src})`;
                    document.querySelector('.league_rank_loader.flex').style.display = 'none';
                });
                document.querySelector('.league_rank_name.flex').innerHTML = rankS + ' ' + mass[1][0].rank;
                document.querySelector('.league_rank_games.flex').innerHTML = `<div class="rank_green">${mass[1][0].wins}</div>|<div class="rank_red">${mass[1][0].losses}</div>`;
                img = new Image();
                img.src = `assets/images/League/Unranked.png`;
                img.addEventListener('load', function () {
                    document.querySelector('.league_rank_img.solo').style.backgroundImage = `url(${this.src})`;
                    document.querySelector('.league_rank_loader.solo').style.display = 'none';
                });
                document.querySelector('.league_rank_name.solo').innerHTML = "Unranked";
                document.querySelector('.league_rank_games.solo').innerHTML = "";
            }
        }
    }
}




