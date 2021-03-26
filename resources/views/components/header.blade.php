<header>
    <!-- Header Start -->
    <div class="header-area header-transparent">
        <div class="main-header">
            <div class="header-bottom header-sticky">
                <div class="container-fluid">
                    <div class="row align-items-center">
                        <!-- Logo -->
                        <div class="col-xl-2 col-lg-3 col-md-4 col-4">
                            <div class="logo">
                                <a href="{{ route('home') }}">
                                    <img src="{{ asset('images/logo/logo.png') }}" class="img-fluid col-10">
                                </a>
                            </div>
                        </div>
                        <div class="col-xl-10 col-lg-9 col-md-8 col-8">
                            <!-- Main-menu -->
                            <div class="main-menu f-right d-none d-lg-block">
                                <nav>
                                    <ul id="navigation">
                                        <li><a href="{{ route('home') }}">Inicio</a></li>
                                        <li><a href="{{ route('aboutUs') }}">Nosotros</a></li>
                                        <li><a href="#">Page</a>
                                            <ul class="submenu">
                                                <li><a href="blog.html">Blog</a></li>
                                                <li><a href="blog_details.html">Blog Details</a></li>
                                                <li><a href="elements.html">Element</a></li>
                                                <li><a href="listing_details.html">Listing details</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="contact.html">Contact</a></li>
                                        <li class="add-list"><a href="listing_details.html"><i class="ti ti-plus"></i> add Listing</a></li>
                                        <li class="login"><a href="{{ route('access') }}">
                                                <i class="ti ti-user"></i> Regístrate o Ingresa</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        <!-- Mobile Menu -->
                        <div class="col-12">
                            <div class="mobile_menu d-block d-lg-none"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Header End -->
</header>
