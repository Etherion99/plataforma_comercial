<link rel="stylesheet" href="{{ asset('css/components/search_results.css') }}">

@foreach ($results as $result)
<div class="search-result col-12 py-2 px-0 m-0 row d-flex align-items-center" id="search-result-{{ $result->id }}">
    <div class="col-4">
        <img src="https://picsum.photos/200/100?q=<?php echo random_int(1, 25);?>" alt="logo empresa" class="result-img img-fluid">
    </div>
    <div class="col-8">
        <div class="col-12">
            <p class="result-name font-weight-bold">{{ $result->name }}</p>
        </div>
        <div class="col-12 mt-2">
            <p class="result-category m-0">{{ $result->category->name }}</p>
        </div>
    </div>
</div>
@endforeach
