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
    public function getPost(){

        $redis = Redis::connection();
        $redis->setOption(\Redis::OPT_SERIALIZER, \Redis::SERIALIZER_PHP);

        if (Cache::has('user:'.Auth::user()->id)) {

            $posts_from_cache = [];

            $post_ids = Cache::get('user:'.Auth::user()->id);

            foreach ($post_ids as $key => $postid) {
              $posts_from_cache[] = $redis->get('post:'.$postid);
            }

            return $posts_from_cache;
        }
        else{

          $this->usersfeed = [];

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


          $redis->pipeline(function ($pipe) use ($posts){
              foreach ($posts as $key => $row) {
                  $this->usersfeed[] = $row['post_id'];
                  $pipe->set('post:'.$row['post_id'], $posts[$key], 50000);
              }
          });

          Cache::add('user:'.Auth::user()->id, $this->usersfeed);

          return $posts;
        }


    }
}
