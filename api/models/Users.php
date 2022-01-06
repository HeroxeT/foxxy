<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "users".
 *
 * @property int $id
 * @property string $login
 * @property string $password
 * @property string $mail
 * @property string $token
 */
class Users extends \yii\db\ActiveRecord implements \yii\web\IdentityInterface
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'users';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['login', 'password', 'mail', 'token'], 'required'],
            [['login', 'password', 'mail', 'token'], 'string'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'login' => 'Login',
            'password' => 'Password',
            'mail' => 'Mail',
            'token' => 'Token',
        ];
    }
    public static function findIdentity($id)
    {
        return isset(self::$users[$id]) ? new static(self::$users[$id]) : null;
    }

    /**
     * {@inheritdoc}
     */
    public static function findIdentityByAccessToken($token, $type = null)
    {
        $user = self::findOne(['token' => $token]);
        return $user ? $user : null;
    }

    /**
     * Finds user by username
     *
     * @param string $username
     * @return static|null
     */
    public static function findByUsername($username)
    {
        foreach (self::$users as $user) {
            if (strcasecmp($user['username'], $username) === 0) {
                return new static($user);
            }
        }

        return null;
    }

    /**
     * {@inheritdoc}
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * {@inheritdoc}
     */
    public function getAuthKey()
    {
        return $this->token;
    }
    public function validateAuthKey($authKey)
    {
        return $this->authKey === $authKey;
    }
    public static function getIndef($login,$mail, $password=false){
        if (!$password){
            if ($user = Users::findOne(['login' => $login])){
                return [false, 1];
            }elseif ($user = Users::findOne(['mail' => $mail])){
                return [false, 2];
            }else{
                return [true];
            }
        }else{
            if ($user = Users::findOne(['login'=> $login, 'password'=> $password])){
                return [true];
            }else{
                return [false, 3];
            }
        }

    }
}
