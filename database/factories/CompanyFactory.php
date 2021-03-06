<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;

class CompanyFactory extends Factory
{
    protected $model = Company::class;

    public function definition()
    {
        $categories = Category::select('id')->where('category_id', '!=', null)->pluck("id");

        return [
            'name' => $this->faker->word(),
            'description' => $this->faker->sentence(10),
            'category_id' => $this->faker->randomElement($categories),
            'pack_id' => $this->faker->randomElement([1, 2, 3]),
            'delivery' => $this->faker->randomElement([0, 1]),
            'logo_ext' => 'jpg'
        ];
    }
}
