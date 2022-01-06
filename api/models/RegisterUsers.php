<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "register_users".
 *
 * @property int $id
 * @property string $mail
 * @property string $login
 * @property string $password
 * @property string $mail_token
 */
class RegisterUsers extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'register_users';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['mail', 'login', 'password', 'mail_token'], 'required'],
            [['mail', 'login', 'password', 'mail_token'], 'string'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'mail' => 'Mail',
            'login' => 'Login',
            'password' => 'Password',
            'mail_token' => 'Mail Token',
        ];
    }
    public static function findIndef($login){
        if ($user = RegisterUsers::findOne(['login'=> $login])){
            return [false, 4];
        }
        return [true];
    }
}
