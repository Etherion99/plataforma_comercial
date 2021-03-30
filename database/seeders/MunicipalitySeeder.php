<?php

namespace Database\Seeders;

use App\Models\Municipality;
use Illuminate\Database\Seeder;

class MunicipalitySeeder extends Seeder
{
    public function run()
    {
        Municipality::insert([
           'name' => 'La Plata',
           'department_id' => 1
        ]);
    }
}
