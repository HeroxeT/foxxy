<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "profiles".
 *
 * @property int $id
 * @property int $user_id
 * @property string $date_for_enter
 * @property string $date_register
 * @property string $into
 * @property string $birthday
 */
class Profiles extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'profiles';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['user_id', 'date_for_enter', 'date_register', 'into', 'birthday'], 'required'],
            [['user_id'], 'integer'],
            [['date_for_enter', 'date_register', 'into', 'birthday'], 'string'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'user_id' => 'User ID',
            'date_for_enter' => 'Date For Enter',
            'date_register' => 'Date Register',
            'into' => 'Into',
            'birthday' => 'Birthday',
        ];
    }
}
