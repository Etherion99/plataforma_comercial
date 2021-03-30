<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Department;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            CategorySeeder::class,
            CompanySeeder::class,
            PaymentMethodSeeder::class,
            DepartmentSeeder::class,
            MunicipalitySeeder::class
        ]);
    }
}
