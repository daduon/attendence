<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = [
        'grade_id','firstname','lastname','address','phone'
    ];

    function grade(){
        return $this->belongsTo('App\Grade');
    }
    /**
     * Get all of the attendences for the Teacher
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function attendences()
    {
        return $this->hasMany('App\Attendence');
    }
}
