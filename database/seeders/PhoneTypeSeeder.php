<?php

namespace Database\Seeders;

use App\Models\PhoneType;
use Illuminate\Database\Seeder;

class PhoneTypeSeeder extends Seeder
{
    public function run()
    {
        $data = array(
            array(
                'name' => 'Fijo'
            ),
            array(
                'name' => 'Celular'
            ),
            array(
                'name' => 'Whastapp'
            ),
            array(
                'name' => 'Llamadas y Whatsapp'
            )
        );

        foreach($data as $item){
            PhoneType::insert($item);
        }
    }
}
