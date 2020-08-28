<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'student_id_number', 'email', 'password', 'lastname', 'firstname', 'middlename',
        'contact_no', 'birthdate', 'relationship_status', 'address', 'permanent_address', 'year_graduated',
        'section', 'job', 'company', 'job_started', 'photo', 'gender', 'status'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'student_id_number', 'email', 'password', 'contact_no', 'birthdate', 'relationship_status', 
        'address', 'permanent_address', 'year_graduated', 'section', 'job', 'company', 'job_started', 
        'gender', 'status', 'email_verified_at', 'remember_token', 'updated_at'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function user(){
        return $this->belongsTo('App\post');
    }

}
