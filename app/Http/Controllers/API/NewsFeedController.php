<?php

namespace App\Http\Controllers\API;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
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

        if (Cache::has('user:'.Auth::user()->id)) {

            $posts_from_cache = [];

            $post_ids = Cache::get('user:'.Auth::user()->id);

            foreach ($post_ids as $key => $postid) {
              $posts_from_cache[] = Cache::get('post:'.$postid);
            }

            return $posts_from_cache;
        }
        else{

          $usersfeed = [];

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

          foreach ($posts as $key => $row) {
            $usersfeed[] = $row['post_id'];
            Cache::add('post:'.$row['post_id'], $posts[$key], 500000);
          }

          Cache::add('user:'.Auth::user()->id, $usersfeed);

          return $posts;
        }


    }
}
