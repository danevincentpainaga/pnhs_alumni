<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;
use Pion\Laravel\ChunkUpload\Exceptions\UploadFailedException;
use Pion\Laravel\ChunkUpload\Exceptions\UploadMissingFileException;
use Pion\Laravel\ChunkUpload\Handler\AbstractHandler;
use Pion\Laravel\ChunkUpload\Handler\HandlerFactory;
use Pion\Laravel\ChunkUpload\Receiver\FileReceiver;
use App\post;
use App\post_image;
use App\tagged_user;

class PostController extends Controller
{

    public function uploadFiles(Request $request)
    {
        $receiver = new FileReceiver("file", $request, HandlerFactory::classFromRequest($request));

        if ($receiver->isUploaded() === false) {
            throw new UploadMissingFileException();
        }

        $save = $receiver->receive();

        if ($save->isFinished()) {
            return $this->saveFile($save->getFile());
        }

        $handler = $save->handler();

        return response()->json([
            "done" => $handler->getPercentageDone(),
            'status' => true
        ]);

    }


    protected function saveFile(UploadedFile $file)
    {
        $fileName = $this->createFilename($file);
        $mime = str_replace('/', '-', $file->getMimeType());
        $dateFolder = date("Y-m-W");

        $filePath = "upload/{$mime}/{$dateFolder}/";
        $finalPath = storage_path("app/public/".$filePath);

        $file->move($finalPath, $fileName);
        

        return response()->json([
            'path' => $filePath,
            'name' => $fileName,
            'mime_type' => $mime
        ]);

    }

    protected function createFilename(UploadedFile $file)
    {
        $extension = $file->getClientOriginalExtension();
        $filename = str_replace(".".$extension, "", $file->getClientOriginalName()); 
        $filename .= "_" . md5(time()) . "." . $extension;

        return $filename;
    }

    public function checkChunk($filename)
    {
        $files = array();
        $files['size'] = 0;
        foreach (scandir(storage_path("app/chunks/")) as $file) {
            if ($file !== '.' && $file !== '..') {
                if ($filename == substr($file, 0, strpos($file,"_pnhsKey"))) {
                    $files['size'] = filesize('../storage/app/chunks/'.$file);
                }
            }
        }
        return $files;
    }

    public function savePostDescriptionOnly(Request $request)
    {
        if ($request->has('post')) {
            /* save post description only */
            $post = new post();
            $post->description = $request->post['post_description'];
            $post->privacy = $request->post['privacy'];
            $post->p_userid = Auth::user()->id;
            $post->save();

            if ($request->has('post.taggedUsers')) {
                $this->saveTaggedUsers($request->post['taggedUsers'], $post->post_id);
            }

            return response()->json([
                'post' => $request->post
            ]);
        }
    }

    public function savePostFilesOnly(Request $request)
    {
        /* save post description only */
        $post = new post();
        $post->privacy = $request->post['privacy'];
        $post->p_userid = Auth::user()->id;
        $post->save();

        foreach ($request->post['files'] as $key => $value) {

            $new_image_name = $value['path'] . $value['name'];

            $photo = new post_image();
            $photo->image_post_id  = $post->post_id;
            $photo->image_name = $new_image_name;
            $photo->image_description = $value['description'];
            $photo->save();

        }

        $this->saveTaggedUsers($request->post['taggedUsers'], $post->post_id);

        return response()->json([
            'post' => $post
        ]);
    }

    public function savePostDescriptionWithFiles(Request $request)
    {
        /* save post and its files */
        $post = new post();
        $post->description = $request->post['post']['description'];
        $post->privacy = $request->post['post']['privacy'];
        $post->p_userid = Auth::user()->id;
        $post->save();


        foreach ($request->post['files'] as $key => $value) {

            $new_image_name = $value['path'] . $value['name'];

            $photo = new post_image();
            $photo->image_post_id  = $post->post_id;
            $photo->image_name = $new_image_name;
            $photo->image_description = $value['description'];
            $photo->save();

        }

        $this->saveTaggedUsers($request->post['taggedUsers'], $post->post_id);

        return response()->json([
            'fileName' => $post->post_id
        ]);
    }

    private function saveTaggedUsers($taggedUsers, $postId){
        foreach ($taggedUsers as $key => $tag) {
            $t = new tagged_user();
            $t->tagged_post_id = $postId;
            $t->tagged_user_id  = $tag['id'];
            $t->save();
        }
    }

}
