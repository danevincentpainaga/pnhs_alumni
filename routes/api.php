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

Route::post('login', 'API\AuthController@login');
// Route::post('register', 'API\AuthController@register');
Route::post('registerTest', 'API\AuthController@register');

Route::group(['middleware'=>'auth:api'], function(){

	Route::post('uploadFiles', 'API\PostController@uploadFiles');
	Route::post('savePostDescriptionOnly', 'API\PostController@savePostDescriptionOnly');
	Route::post('savePostFilesOnly', 'API\PostController@savePostFilesOnly');
	Route::post('savePostDescriptionWithFiles', 'API\PostController@savePostDescriptionWithFiles');
	Route::post('savePost', 'API\PostController@savePost');
	Route::get('checkChunk/{filename}', 'API\PostController@checkChunk');
	
	Route::get('getUser', 'API\AuthController@getUser');
	
	Route::post('getSearchFriends', 'API\FriendsController@getSearchFriends');
	
	Route::get('getPost', 'API\NewsFeedController@getPost');
	
	
	// Route::post('uploadProfilePic', 'API\userAccountsController@uploadProfilePic');

	// Route::get('getUserAccounts', 'API\userAccountsController@getUserAccounts');
	// Route::get('getUserLoggedEducationalBackground', 'API\userAccountsController@getUserLoggedEducationalBackground');
	// Route::get('getWorkExperience', 'API\userAccountsController@getWorkExperience');
	// Route::get('getSkills', 'API\userAccountsController@getSkills');
	// Route::get('getUserLoggedBusinesses', 'API\userAccountsController@getUserLoggedBusinesses');

	// Route::post('updateNameAddress', 'API\userAccountsController@updateNameAddress');
	// Route::post('updateUserAdditionalDetails', 'API\userAccountsController@updateUserAdditionalDetails');
	// Route::post('updateJob', 'API\userAccountsController@updateJob');
	// Route::post('updateEducation', 'API\userAccountsController@updateEducation');
	// Route::post('saveEducation', 'API\userAccountsController@saveEducation');
	// Route::post('removeEducations', 'API\userAccountsController@removeEducations');
	// Route::post('saveWorkExperience', 'API\userAccountsController@saveWorkExperience');
	// Route::post('updateWorkExperience', 'API\userAccountsController@updateWorkExperience');
	// Route::post('removeWorkExperience', 'API\userAccountsController@removeWorkExperience');
	// Route::post('removeSkills', 'API\userAccountsController@removeSkills');
	// Route::post('saveBusiness', 'API\userAccountsController@saveBusiness');
	// Route::post('updateBusiness', 'API\userAccountsController@updateBusiness');
	// Route::post('removeBusiness', 'API\userAccountsController@removeBusiness');




});