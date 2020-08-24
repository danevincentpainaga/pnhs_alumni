<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use DB;

class FriendsController extends Controller
{
    public function getSearchFriends(Request $request)
    {
    	return User::where(DB::raw('CONCAT(firstname," ",lastname)'), 'like', "%{$request->search}%")->get();
    }
}
