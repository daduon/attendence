<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Grade extends Model
{
    protected $fillable = [
        'name','status'
    ];
    function teachers(){
        return $this->hasMany('App\Teacher');
    }
    function students(){
        return $this->hasMany('App\Student');
    }
}
