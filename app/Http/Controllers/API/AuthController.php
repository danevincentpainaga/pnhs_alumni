<?php
namespace App\Http\Controllers\Api;
use Illuminate\Http\Request; 
use App\Http\Controllers\Controller; 
use Illuminate\Support\Facades\Auth; 
use Illuminate\Support\Facades\Hash;
use Validator;
use DB;
use App\User; 

class AuthController extends Controller 
{

	 public $successStatus = 200;
	  
	 public function register(Request $request) {  
			 $validator = Validator::make($request->all(), [
			              'email' => 'required|email',
			              'password' => 'required',  
			              'c_password' => 'required|same:password', 
			    ]);   

			 if ($validator->fails()) {          
			       return response()->json(['error'=>$validator->errors()], 401);                        
			   }    
			 $input = $request->all();  
			 $input['password'] = bcrypt($input['password']);
			 $user = User::create($input); 
			 $success['token'] =  $user->createToken('AppName')->accessToken;
			 return response()->json(['success'=>$success], $this->successStatus);
	}
  
   
	public function login(){ 
		if(Auth::attempt(['email' => request('email'), 'password' => request('password')]))
		{
			$user = Auth::user(); 
			$success['token'] =  $user->createToken('AppName')->accessToken; 

			return response()->json(
			 							[
			 								'success'=>$success
			 							], 

			 							$this->successStatus
			 						);

		}
		else
		{ 
			return response()->json(['error'=>'Unauthorised'], 401); 
		} 
	}

	public function getUser() {
		$user = Auth::user();
		return response()->json(['success' => $user], $this->successStatus); 
	}

    public function updateUserPassword(Request $request){
      $user = User::find($request->input('id'));
      $passwordMatch = Hash::check($request->input('password'), $user->password);
      if($passwordMatch){
          $user->password = bcrypt($request->input('newpassword'));
          $user->save();
          return response()->json(['status'=> 'updated'], 200);
      }
      else
      {
        return response()->json(['status'=>$passwordMatch], 404);
      }
    }

    public function updateBusinessPassword(Request $request){
      $user = business::find($request->input('id'));
      $passwordMatch = Hash::check($request->input('password'), $user->password);
      if($passwordMatch){
          $user->password = bcrypt($request->input('newpassword'));
          $user->save();
          return response()->json(['status'=> 'updated'], 200);
      }
      else
      {
        return response()->json(['status'=>$passwordMatch], 404);
      }
    }


	 public function registerTest(Request $request) {  

			 $input = $request->all();  
			 $input['password'] = bcrypt($input['password']);
			 $user = User::create($input); 
			 $success['token'] =  $user->createToken('pnhs')->accessToken;
			 return response()->json(['success'=>$success], $this->successStatus);
	}

}

