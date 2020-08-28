<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class post extends Model
{
    protected $primaryKey = 'post_id';

    protected $fillable = [
        'description', 'privacy', 'p_userid ', 'created_at', 'updated_at'
    ];

    protected $hidden = [
        'p_userid', 'updated_at'
    ];

    public function images(){
    	return $this->hasMany('App\post_image', 'image_post_id', 'post_id');
    }

    public function user(){
    	return $this->hasOne('App\user', 'id', 'p_userid');
    }
}
