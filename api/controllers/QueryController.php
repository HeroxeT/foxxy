<?php

namespace app\controllers;


use app\models\Postcd;
use DateTime;
use yii\rest\ActiveController;
use yii\web\HttpClient;
use \Yii;

class QueryController extends ActiveController
{
    private $api_key = 'RGAPI-357591ed-798d-4bda-9e95-e9a111863d46';
    public $modelClass = 'app\models\Postcd';
    public function actionIndex()
    {
        return;
    }

//Лига легенд
    public function actionPlayerleague($id)
    {
        if (self::procedureCD($id, 'LeagueProfileCheck', 3)) {
            $client = new HttpClient();
            $player = $client->get("https://ru.api.riotgames.com/lol/summoner/v4/summoners/" . $id . "?api_key=" . $this->api_key);
            $ranks = $client->get("https://ru.api.riotgames.com/lol/league/v4/entries/by-summoner/" . $id . "?api_key=" . $this->api_key);
            return '[' . $player . ',' . $ranks . ']';
        }
        return false;
    }

    public function actionNickleague($nick)
    {
        if (self::procedureCD($nick, 'LeagueProfileCheck', 3)) {
            $nick = str_replace(' ', '%20', $nick);
            $client = new HttpClient();
            return $client->get("https://ru.api.riotgames.com/lol/summoner/v4/summoners/by-name/" . $nick . "?api_key=" . $this->api_key);
        }
        return false;
    }

    public function actionGames()
    {
        $input = Yii::inputP(); //id start end
        if ($input['end'] <= 10) {
            if (self::procedureCD($input['id'], 'LeagueGameCheck', 5)) {
                $client = new HttpClient();
                $server = 0;
                $res = $client->get("https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/" . $input['id'] . "/ids?start=" . $input['start'] . "&count=" . $input['end'] . "&api_key=" . $this->api_key);
                if (count(json_decode($res)) == 0){
                    $server = 1;
                    $res = $client->get("https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/".$input['id']."/ids?start=".$input['start']."&count=".$input['start']."&api_key=".$this->api_key);
                    if (count(json_decode($res)) == 0){
                        $server = 2;
                        $res = $client->get("https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/".$input['id']."/ids?start=".$input['start']."&count=".$input['start']."&api_key=".$this->api_key);
                    }
                }
                $res = json_decode($res);
                $mass = [];
                foreach ($res as $id){
                    array_push($mass, self::FindMatch($id, $server, $input['id']));
                }
                return $mass;
            }
        }
        return false;
    }

    public function FindMatch($id, $server, $puuid){
        $client = new HttpClient();
        switch ($server) {
            case 0:
                $res = json_decode($client->get("https://europe.api.riotgames.com/lol/match/v5/matches/".$id."?api_key=".$this->api_key));
                break;
            case 1:
                $res = json_decode($client->get("https://asia.api.riotgames.com/lol/match/v5/matches/".$id."?api_key=".$this->api_key));
                break;
            case 2:
                $res = json_decode($client->get("https://americas.api.riotgames.com/lol/match/v5/matches/".$id."?api_key=".$this->api_key));
                break;
        }
        $champs = [];
        $str = substr($res->info->gameStartTimestamp, 0, strlen($res->info->gameStartTimestamp)-3);
        $date = date('d.m.Y', $str);
        $game_start = $date;
        if(strlen($res->info->gameDuration%60)>1){
            $sec = $res->info->gameDuration%60;
        }else{
            $sec = '0'.$res->info->gameDuration%60;
        }
        if(strlen(intdiv($res->info->gameDuration, 60))>1){
            $min =intdiv($res->info->gameDuration, 60);
        }else{
            $min = '0'.intdiv($res->info->gameDuration, 60);
        }
        $gameDur =  $min.':'.$sec;
        foreach($res->info->participants as $person){
            array_push($champs, $person->championName);
            if ($puuid === $person->puuid){
                $lane = $person->individualPosition;
                $item = [$person->item0, $person->item1,$person->item2,$person->item3, $person->item4,$person->item5,$person->item6];
                $champ = [$person->championName, $person->champLevel];
                $win = $person->win;
                $gold = $person->goldEarned;
                $kda = [$person->kills, $person->deaths, $person->assists];
                $minion = $person->totalMinionsKilled + $person->neutralMinionsKilled;
                $summonerSpell = [$person->perks->styles[1]->selections[0]->perk, $person->summoner1Id, $person->summoner2Id];
            }
        }
        $match = [
            'persons' => $champs,
            'lane' => $lane,
            'item' => $item,
            'champion'=>$champ,
            'win'=>$win,
            'kda'=>$kda,
            'gold'=>$gold,
            'minions' => $minion,
            'summonerSpell' => $summonerSpell,
            'duration' => $gameDur,
            'dateStart' => $game_start
        ];
        return $match;
    }

    //вспомогалки
    public function GetIP()
    {
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            $ip = $_SERVER['REMOTE_ADDR'];
        }
        return $ip;

    }

    public function procedureCD($id, $type, $cdr)
    {
        $ip = self::GetIP();
        if ($cd = Postcd::findOne(['post_id' => $id, 'type' => $type, 'ip' => $ip])) {
            if (time() - $cd->time > $cdr) {
                if ($cd2 = Postcd::findAll(['ip' => $ip])){
                    foreach ($cd2 as $item){
                           if (time() - $item->time < 3){
                               sleep(3);
                               return self::procedureCD($id, $type, $cdr);
                           }
                    }
                    $cd->time = time();
                    $cd->save();
                    return true;
                }
            } else {
                sleep($cdr);
                return self::procedureCD($id, $type, $cdr);
            }
        } else {
            $cd = new Postcd();
            $cd->post_id = $id;
            $cd->type = $type;
            $cd->ip = $ip;
            $cd->time = time();
            $cd->save();
            if (count($cd->errors)) {
                return $cd->errors;
            }
            return true;
        }
    }
}
