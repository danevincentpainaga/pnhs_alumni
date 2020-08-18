<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;

class AlumniController extends Controller
{
    public function getAlumni()
    {
    	return User::all();
    }
}
