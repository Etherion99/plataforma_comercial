<?php

namespace Database\Seeders;

use App\Models\SocialNetwork;
use Illuminate\Database\Seeder;

class SocialNetworkSeeder extends Seeder
{
    public function run()
    {
        $data = array(
            array(
                'name' => 'Instagram',
                'icon' => 'fab fa-instagram',
            ),
            array(
                'name' => 'Facebook',
                'icon' => 'fab fa-facebook',
            ),
            array(
                'name' => 'Correo Electrónico',
                'icon' => 'fas fa-envelope',
            )
        );


        foreach($data as $item){
            SocialNetwork::insert($item);
        }
    }
}
