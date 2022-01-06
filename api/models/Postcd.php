<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "postcd".
 *
 * @property int $id
 * @property string $type
 * @property string $post_id
 * @property int $time
 * @property string $ip
 */
class Postcd extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'postcd';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['type', 'post_id', 'time', 'ip'], 'required'],
            [['type', 'post_id', 'ip'], 'string'],
            [['time'], 'integer'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'type' => 'Type',
            'post_id' => 'Post ID',
            'time' => 'Time',
            'ip' => 'Ip',
        ];
    }
}
