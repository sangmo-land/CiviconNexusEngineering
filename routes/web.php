<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\HousePlanController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\QuoteRequestController;
use App\Http\Controllers\ServiceController;
use Illuminate\Support\Facades\Route;

// Home
Route::get('/', HomeController::class)->name('home');

// Services
Route::get('/services', [ServiceController::class, 'index'])->name('services.index');
Route::get('/services/{slug}', [ServiceController::class, 'show'])->name('services.show');

// Projects
Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');
Route::get('/projects/{slug}', [ProjectController::class, 'show'])->name('projects.show');

// Blog
Route::get('/blog', [PostController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [PostController::class, 'show'])->name('blog.show');

// House Plans
Route::get('/plans', [HousePlanController::class, 'index'])->name('plans.index');
Route::get('/plans/{slug}', [HousePlanController::class, 'show'])->name('plans.show');
Route::get('/plans/{slug}/download', [HousePlanController::class, 'download'])->name('plans.download');

// Contact
Route::get('/contact', [ContactController::class, 'create'])->name('contact.create');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

// Quote Request
Route::get('/quote-request', [QuoteRequestController::class, 'create'])->name('quote-request.create');
Route::post('/quote-request', [QuoteRequestController::class, 'store'])->name('quote-request.store');
