<?php

namespace Database\Seeders;

use App\Models\PaymentMethod;
use Illuminate\Database\Seeder;

class PaymentMethodSeeder extends Seeder
{
    public function run()
    {
        $data = array(
            array(
                'name' => 'Efectivo'
            ),
            array(
                'name' => 'Tarjeta'
            ),
            array(
                'name' => 'Transferencia'
            ),
            array(
                'name' => 'Código QR'
            )
        );

        foreach($data as $item){
            PaymentMethod::insert($item);
        }
    }
}
