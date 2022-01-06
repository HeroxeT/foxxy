<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "users_platforms".
 *
 * @property int $id
 * @property int $platform_id
 * @property int $user_id
 * @property string $token
 */
class UsersPlatforms extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'users_platforms';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['platform_id', 'user_id', 'token'], 'required'],
            [['platform_id', 'user_id'], 'integer'],
            [['token'], 'string'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'platform_id' => 'Platform ID',
            'user_id' => 'User ID',
            'token' => 'Token',
        ];
    }
}
