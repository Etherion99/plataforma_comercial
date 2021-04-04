<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    protected $fillable = ['day', 'company_id', 'start', 'end'];

    public function company(){
        return $this->belongsTo(Company::class);
    }
}
