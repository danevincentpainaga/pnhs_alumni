<?php

namespace App\Http\Controllers\API;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\user;
use App\post;

class NewsFeedController extends Controller
{
    public function getPost(){

        // $user = user::find(Auth::user()->id)->friends;
        // $collection = collect($user->pluck('request_sender'))->push(Auth::user()->id);
        // $posts = post::whereIn('p_userid', $collection)
        //         ->with('user', 'images')
        //         ->orderBy('post_id', 'DESC')
        //         ->get();


      	// $user = user::find(Auth::user()->id)->friends;
       //  $collection = collect($user->pluck('request_sender'))->push(Auth::user()->id);
       //  $posts = post::where('privacy','=','public')
       //  		->orWhere(function($query) use ($collection){
       //  			$query->where('privacy','=','friends')
       //  			->whereIn('p_userid', $collection)
       //  		})
       //  		// ->orWhereIn('p_userid', $collection)
       //          ->with('user', 'images')
       //          ->orderBy('post_id', 'DESC')
       //          ->get();

      	$user = user::find(Auth::user()->id)->friends;
        $collection = collect($user->pluck('request_sender'))->push(Auth::user()->id);
        $posts = post::where('privacy','=','public')
        		->orWhere(function($query) use ($collection){
        			$query->where('privacy','=','friends')
        			->whereIn('p_userid', $collection);
        		})
                ->with('user', 'images')
                ->orderBy('post_id', 'DESC')
                ->get();

        return $posts;
    }
}
