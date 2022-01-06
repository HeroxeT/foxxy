<?php

function deleteAll(){
    $db = new PDO('mysql:dbname=foxxy;host=localhost', 'root', '');
    $res = $db->query('SELECT * FROM `postcd`')->fetchAll();
    $i = 0;
    foreach ($res as $item){
        $time = time();
        if (time() - $item['time'] > 3600) {
            $db->query('DELETE FROM `postcd` WHERE `id` ='.$item['id']);
            $i++;
        }
    }
    echo 'Удалено  '.$i.' предметов.'.PHP_EOL;;
    sleep(3600);
    deleteAll();
}
deleteAll();
