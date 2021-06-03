<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Attendence extends Model
{
    protected $fillable = [
        'student_id','teacher_id','atten_date','attend',
    ];

    /**
     * Get the teacher that owns the Attendence
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function teacher()
    {
        return $this->belongsTo('App\Teacher');
    }
    public function student()
    {
        return $this->belongsTo('App\Student');
    }

}
