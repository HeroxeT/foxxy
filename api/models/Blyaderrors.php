<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "blyaderrors".
 *
 * @property int $id
 * @property string $name
 */
class Blyaderrors extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'blyaderrors';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name'], 'required'],
            [['name'], 'string'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
        ];
    }
    public static function errorText($id){
        $error = self::findOne(['id' => $id]);
        return ['error' => $error->name];
    }
}
