<?php

use Illuminate\Http\Request;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('login', 'API\AuthController@login');
Route::post('register', 'API\AuthController@register');
// Route::get('test', function(){
// 	$app = Redis::connection();
// 	$app->set('test', 'testvalue');
// 	print_r($app->get('test'));
// 	// print_r(app()->make('redis'));
// });

Route::group(['middleware'=>'auth:api'], function(){

	// Route::post('uploadProfilePic', 'API\userAccountsController@uploadProfilePic');

	Route::get('getUserAccounts', 'API\userAccountsController@getUserAccounts');
	Route::get('getUserLoggedEducationalBackground', 'API\userAccountsController@getUserLoggedEducationalBackground');
	Route::get('getWorkExperience', 'API\userAccountsController@getWorkExperience');
	Route::get('getSkills', 'API\userAccountsController@getSkills');
	Route::get('getUserLoggedBusinesses', 'API\userAccountsController@getUserLoggedBusinesses');

	Route::post('updateNameAddress', 'API\userAccountsController@updateNameAddress');
	Route::post('updateUserAdditionalDetails', 'API\userAccountsController@updateUserAdditionalDetails');
	Route::post('updateJob', 'API\userAccountsController@updateJob');
	Route::post('updateEducation', 'API\userAccountsController@updateEducation');
	Route::post('saveEducation', 'API\userAccountsController@saveEducation');
	Route::post('removeEducations', 'API\userAccountsController@removeEducations');
	Route::post('saveWorkExperience', 'API\userAccountsController@saveWorkExperience');
	Route::post('updateWorkExperience', 'API\userAccountsController@updateWorkExperience');
	Route::post('removeWorkExperience', 'API\userAccountsController@removeWorkExperience');
	Route::post('removeSkills', 'API\userAccountsController@removeSkills');
	Route::post('saveBusiness', 'API\userAccountsController@saveBusiness');
	Route::post('updateBusiness', 'API\userAccountsController@updateBusiness');
	Route::post('removeBusiness', 'API\userAccountsController@removeBusiness');

});