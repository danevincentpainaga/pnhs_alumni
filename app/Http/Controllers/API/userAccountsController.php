<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Redis;
use DB;
use App\User;
use App\education;
use App\work_experience;
use App\skill;
use App\business;

class userAccountsController extends Controller
{
	public $successStatus = 200;

    public function getUserAccounts(){
        $app = Redis::connection();
        $value = Cache::remember('userlogged', 30, function () {
            return [Auth::user()];
        });
        return $value;
    }

    public function updateNameAddress(Request $request){

        $user = User::find(Auth::user()->id);
        $user->firstname = $request->input('firstname');
        $user->lastname = $request->input('lastname');
        $user->middlename = $request->input('middlename');
        $user->address = $request->input('address');
        $user->save();
        return response()->json(['message'=>'Successfully Updated'], $this->successStatus);
        
    }

    public function updateUserAdditionalDetails(Request $request){

        $user = User::find(Auth::user()->id);
        $user->contact_no = $request->input('contact_no');
        $user->gender = $request->input('gender');
        $user->birthdate = $request->input('birthdate');
        $user->relationship_status = $request->input('relationship_status');
        $user->permanent_address = $request->input('permanent_address');
        $user->save();
        return response()->json(['message'=>'Successfully Updated'], $this->successStatus);

    }

    public function getSkills(){
        return skill::where('s_uid', Auth::user()->id)->orderBy('skills', 'asc')->get();
    }

    public function updateJob(Request $request){

        $user = User::find(Auth::user()->id);
        $user->company = $request->input('company');
        $user->job = $request->input('job');
        $user->job_started = $request->input('job_started');
        $user->save();
        return response()->json(['message'=>'Successfully Updated'], 200);       

    }

    public function getUserLoggedEducationalBackground(){
        return education::where('e_uid', Auth::user()->id)->orderBy('education_id', 'desc')->get();
    }

    public function updateEducation(Request $request){

        $education = education::find($request->input('education_id'));
        $education->degree = $request->input('degree');
        $education->year_graduated = $request->input('year_graduated');
        $education->school = $request->input('school');
        $education->remarks = $request->input('remarks');
        $education->save();
        return response()->json(['message'=>'Successfully Updated'], $this->successStatus);     
    
    }

    public function saveEducation(Request $request){
    	$request["e_uid"] = Auth::user()->id;
        return response()->json(education::create($request->all()));  
    }

    public function removeEducations(Request $request){
        education::destroy($request->education_id);
        return response()->json(['message'=>'Deleted'], $this->successStatus);
    }

    public function getWorkExperience(){
    	$we = work_experience::where('w_uid', Auth::user()->id)->orderBy('work_experience_id', 'desc')->get();
    	return response()->json($we, $this->successStatus);  
    }

    public function saveWorkExperience(Request $request){
    	$request['w_uid'] = Auth::user()->id;
        return response()->json(work_experience::create($request->all()));
    }

    public function removeWorkExperience(Request $request){
        work_experience::destroy($request->work_experience_id);
        return response()->json(['message'=>'Work experience deleted'], $this->successStatus);
    }

    public function updateWorkExperience(Request $request){

        $user = work_experience::find($request->work_experience_id);
        $user->company_name = $request->input('company_name');
        $user->position = $request->input('position');
        $user->start_date = $request->input('start_date');
        $user->end_date = $request->input('end_date');
        $user->save();
        return response()->json(['message'=>'Successfully Updated'], $this->successStatus);  

    }

    public function removeSkills(Request $request){
        skill::destroy($request->skills_id);
        return response()->json(['message'=>'Skill deleted'], $this->successStatus);
    }

    public function getUserLoggedBusinesses(){
        return business::where('b_uid', Auth::user()->id)->orderBy('business_name', 'asc')->get();
    }

    public function saveBusiness(Request $request){
        $request['b_uid'] = Auth::user()->id;
        return business::create($request->all());
    }

    public function updateBusiness(Request $request){

        $b = business::find($request->business_id);
        $b->business_type = $request->input('business_type');
        $b->business_name = $request->input('business_name');
        $b->business_started = $request->input('business_started');
        $b->save();
        return response()->json(['message'=>'Successfully Updated'], 200);       

    }

    public function removeBusiness(Request $request){
        business::destroy($request->business_id);
        return response()->json(['message'=>'Business deleted'], $this->successStatus);
    }

}