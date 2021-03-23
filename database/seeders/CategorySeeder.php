<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    public function run()
    {
        $data = array(
            array(
                'name' => 'Categorías',
                'category_id' => null,
            ),
            array(
                'name' => 'Servicios',
                'category_id' => null,
            ),
            array(
                'name' => 'Atención al ciudadano',
                'category_id' => null,
            ),
            array(
                'name' => 'Restaurante',
                'category_id' => '1',
            ),
            array(
                'name' => 'Vestuario',
                'category_id' => '1',
            ),
            array(
                'name' => 'Mercado',
                'category_id' => '1',
            ),
            array(
                'name' => 'Panadería y Pastelería',
                'category_id' => '1',
            ),
            array(
                'name' => 'Estancos y Bar',
                'category_id' => '1',
            ),
            array(
                'name' => 'Hogar',
                'category_id' => '1',
            ),
            array(
                'name' => 'Belleza',
                'category_id' => '1',
            ),
            array(
                'name' => 'Papelerías',
                'category_id' => '1',
            ),
            array(
                'name' => 'Construcción',
                'category_id' => '1',
            ),
            array(
                'name' => 'Detalles',
                'category_id' => '1',
            ),
            array(
                'name' => 'Mascotas',
                'category_id' => '1',
            ),
            array(
                'name' => 'Salud',
                'category_id' => '2',
            ),
            array(
                'name' => 'Eventos',
                'category_id' => '2',
            ),
            array(
                'name' => 'Hotelería y Turismo',
                'category_id' => '2',
            ),
            array(
                'name' => 'Lavandería y Limpieza',
                'category_id' => '2',
            ),
            array(
                'name' => 'Servicios Técnicos',
                'category_id' => '2',
            ),
            array(
                'name' => 'Líneas de emergencia',
                'category_id' => '3',
            )
        );


        foreach($data as $item){
            Category::insert($item);
        }
    }
}
