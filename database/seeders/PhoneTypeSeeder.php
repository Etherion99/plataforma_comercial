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
                'name' => 'Fijo',
                'icons' => '[\"fas fa-phone\"]'
            ),
            array(
                'name' => 'Celular',
                'icons' => '[\"fas fa-mobile-alt\"]'
            ),
            array(
                'name' => 'Whastapp',
                'icons' => '[\"fab fa-whatsapp\"]'
            ),
            array(
                'name' => 'Llamadas y Whatsapp',
                'icons' => '[\"fas fa-mobile-alt\", \"fab fa-whatsapp\"]'
            )
        );

        foreach($data as $item){
            PhoneType::insert($item);
        }
    }
}
