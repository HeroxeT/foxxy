<?php

namespace app\controllers;

use app\models\Blyaderrors;
use app\models\RegisterUsers;
use app\models\Users;
use Yii;
use yii\rest\ActiveController;

class RegController extends ActiveController
{
    public $modelClass = 'app\models\RegisterUsers';

    public function actions()
    {
        return [];
    }

    public function actionCreate()
    {
        $input = Yii::inputP();
        if($input['password' === $input['passwordSec']]){
            $user = new RegisterUsers();
            $user->load($input, "");
            $sting_token = Yii::$app->security->generateRandomString(15);
            $user->password = md5($input['password']);
            $user->mail_token = $sting_token;
            $test = Users::getIndef($user->login, $user->mail);
            if ($test[0]) {
                $user->save();
                if (count($user->errors)) {
                    Yii::code(422, 'Unprocessable entity');
                    return ['error'=> $user->errors];
                } else {
                    Yii::code(201, 'Created');
                    return ['success' => $user->mail];
                }
            } else {
                Yii::code(400, 'Bad Request');
                return Blyaderrors::errorText($test[1]);
            }
        }
        Yii::code(422, 'Unprocessable entity');
        return Blyaderrors::errorText(6);
    }


    public function mailSend()
    {
        //TODO:: сделать рассылку
    }
    public function actionAccept($tk){
        if ($userReg = RegisterUsers::findOne(['mail_token' => $tk])){
            $user = new Users();
            $user->login = $userReg->login;
            $user->password = $userReg->password;
            $user->mail = $userReg->mail;
            $token = Yii::$app->security->generateRandomString(20);
            $user->token = $token;
            $user->save();
            if (count($user->errors)) {
                Yii::code(422, 'Unprocessable entity');
                return ['error'=> $user->errors];
            } else {
                $userReg->delete();
                Yii::$app->response->redirect('http://foxxy');
                return null;
            }
        }else{
            Yii::$app->response->redirect('http://foxxy/404.html'); //https!
            return null;
        }
    }
}
