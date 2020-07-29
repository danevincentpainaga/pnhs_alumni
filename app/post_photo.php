<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class post_photo extends Model
{
    protected $primaryKey = 'post_photos_id';
    public $timestamps = false;

    protected $fillable = [
        'photo_post_id ', 'image_name'
    ];
}
