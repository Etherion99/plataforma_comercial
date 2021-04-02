<?php

namespace Database\Seeders;

use App\Models\Pack;
use Illuminate\Database\Seeder;

class PackSeeder extends Seeder
{
    public function run()
    {
        $data = array(
            array(
                'name' => 'Plan Básico'
            ),
            array(
                'name' => 'Plan Plata'
            ),
            array(
                'name' => 'Plan Premium'
            ),
        );

        foreach($data as $item){
            Pack::insert($item);
        }
    }
}
