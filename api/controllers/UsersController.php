<?php

namespace app\controllers;

use app\models\RegisterUsers;
use app\models\Users;
use yii\filters\auth\CompositeAuth;
use yii\filters\auth\HttpBearerAuth;
use yii\rest\ActiveController;
use Yii;
class UsersController extends ActiveController
{
    public $modelClass = 'app\models\Users';
    public function actions()
    {
        return [];
    }
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['authenticator'] = [
            'class' => CompositeAuth::className(),
            'authMethods' => [
                HttpBearerAuth::className()
            ],
            'except' => ['create', 'login', ],
        ];
        return $behaviors;
    }
}
