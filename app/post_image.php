<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class post_image extends Model
{
    protected $primaryKey = 'image_id';
    public $timestamps = false;

    protected $fillable = [
        'image_post_id ', 'image_name', 'mime_type'
    ];

	public function post()
    {
        return $this->belongsTo('App\post');
    }
}
