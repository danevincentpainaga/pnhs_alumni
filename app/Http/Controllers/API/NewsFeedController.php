<?php

namespace App\Http\Controllers\API;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Redis;
use App\user;
use App\post;

class NewsFeedController extends Controller
{

    private $redis;

    public function __construct(){

      Redis::connection();

    }

    public function getPost()
    {

        if (Redis::exists('user:'.Auth::user()->id)) {

            $posts_from_cache = [];

            $post_ids = Redis::lRange('user:'.Auth::user()->id, 0, -1);

            foreach ($post_ids as $key => $postid) {

              if (Redis::exists('post:'.$postid)) {
                  $posts_from_cache[] = json_decode(Redis::get('post:'.$postid));
              }
              else{
                  $post_from_db = post::with('user', 'images')->find($postid);
                  $posts_from_cache[] = $post_from_db;
                  Redis::set('post:'.$postid, json_encode($post_from_db));
              }

            }
            
            return $posts_from_cache;
        }
        else{

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

          $this->cachePost($posts);

          return $posts;
          
        }
    }

    public function cachePost($posts)
    {
        Redis::pipeline(function ($pipe) use ($posts){
            foreach ($posts as $key => $row) {
                Redis::lPush('user:'.Auth::user()->id, $row['post_id']);
                $pipe->set('post:'.$row['post_id'], json_encode($row), 50000);
            }
        });
    }

}
