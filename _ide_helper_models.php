<?php

// @formatter:off
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * App\Models\Address
 *
 * @property int $id
 * @property string $text
 * @property int $municipality_id
 * @property int $company_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Address newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Address newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Address query()
 * @method static \Illuminate\Database\Eloquent\Builder|Address whereCompanyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Address whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Address whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Address whereMunicipalityId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Address whereText($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Address whereUpdatedAt($value)
 */
	class Address extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Category
 *
 * @property int $id
 * @property string $name
 * @property int|null $category_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|Category[] $allCategories
 * @property-read int|null $all_categories_count
 * @property-read \Illuminate\Database\Eloquent\Collection|Category[] $categories
 * @property-read int|null $categories_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Company[] $companies
 * @property-read int|null $companies_count
 * @method static \Illuminate\Database\Eloquent\Builder|Category newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Category newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Category query()
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereUpdatedAt($value)
 */
	class Category extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Company
 *
 * @property int $id
 * @property string $name
 * @property string $description
 * @property int $category_id
 * @property int $pack_id
 * @property int $delivery
 * @property string $logo_ext
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Category $category
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\PaymentMethod[] $paymentMethods
 * @property-read int|null $payment_methods_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Phone[] $phones
 * @property-read int|null $phones_count
 * @method static \Database\Factories\CompanyFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Company newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Company newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Company query()
 * @method static \Illuminate\Database\Eloquent\Builder|Company whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Company whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Company whereDelivery($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Company whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Company whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Company whereLogoExt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Company whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Company wherePackId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Company whereUpdatedAt($value)
 */
	class Company extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Department
 *
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Municipality[] $municipalities
 * @property-read int|null $municipalities_count
 * @method static \Illuminate\Database\Eloquent\Builder|Department newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Department newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Department query()
 * @method static \Illuminate\Database\Eloquent\Builder|Department whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Department whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Department whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Department whereUpdatedAt($value)
 */
	class Department extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\GalleryPhoto
 *
 * @property int $id
 * @property int $number
 * @property int $company_id
 * @property string $extension
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|GalleryPhoto newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GalleryPhoto newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GalleryPhoto query()
 * @method static \Illuminate\Database\Eloquent\Builder|GalleryPhoto whereCompanyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GalleryPhoto whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GalleryPhoto whereExtension($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GalleryPhoto whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GalleryPhoto whereNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GalleryPhoto whereUpdatedAt($value)
 */
	class GalleryPhoto extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Municipality
 *
 * @property int $id
 * @property string $name
 * @property int $department_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Department $department
 * @method static \Illuminate\Database\Eloquent\Builder|Municipality newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Municipality newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Municipality query()
 * @method static \Illuminate\Database\Eloquent\Builder|Municipality whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Municipality whereDepartmentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Municipality whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Municipality whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Municipality whereUpdatedAt($value)
 */
	class Municipality extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Pack
 *
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Pack newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Pack newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Pack query()
 * @method static \Illuminate\Database\Eloquent\Builder|Pack whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pack whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pack whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pack whereUpdatedAt($value)
 */
	class Pack extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\PaymentMethod
 *
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Company[] $companies
 * @property-read int|null $companies_count
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentMethod newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentMethod newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentMethod query()
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentMethod whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentMethod whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentMethod whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentMethod whereUpdatedAt($value)
 */
	class PaymentMethod extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Phone
 *
 * @property int $id
 * @property string $number
 * @property int $phone_type_id
 * @property int $company_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Company $company
 * @method static \Illuminate\Database\Eloquent\Builder|Phone newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Phone newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Phone query()
 * @method static \Illuminate\Database\Eloquent\Builder|Phone whereCompanyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Phone whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Phone whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Phone whereNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Phone wherePhoneTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Phone whereUpdatedAt($value)
 */
	class Phone extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\PhoneType
 *
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Phone[] $phones
 * @property-read int|null $phones_count
 * @method static \Illuminate\Database\Eloquent\Builder|PhoneType newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PhoneType newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PhoneType query()
 * @method static \Illuminate\Database\Eloquent\Builder|PhoneType whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PhoneType whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PhoneType whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PhoneType whereUpdatedAt($value)
 */
	class PhoneType extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Schedule
 *
 * @property int $id
 * @property int $day
 * @property int $company_id
 * @property string $start
 * @property string $end
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Schedule newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Schedule newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Schedule query()
 * @method static \Illuminate\Database\Eloquent\Builder|Schedule whereCompanyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Schedule whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Schedule whereDay($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Schedule whereEnd($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Schedule whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Schedule whereStart($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Schedule whereUpdatedAt($value)
 */
	class Schedule extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\SocialLink
 *
 * @property int $id
 * @property string $url
 * @property int $social_network_id
 * @property int $company_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|SocialLink newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SocialLink newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SocialLink query()
 * @method static \Illuminate\Database\Eloquent\Builder|SocialLink whereCompanyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SocialLink whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SocialLink whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SocialLink whereSocialNetworkId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SocialLink whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SocialLink whereUrl($value)
 */
	class SocialLink extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\SocialNetwork
 *
 * @property int $id
 * @property string $name
 * @property string $icon
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|SocialNetwork newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SocialNetwork newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SocialNetwork query()
 * @method static \Illuminate\Database\Eloquent\Builder|SocialNetwork whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SocialNetwork whereIcon($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SocialNetwork whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SocialNetwork whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SocialNetwork whereUpdatedAt($value)
 */
	class SocialNetwork extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\User
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @method static \Database\Factories\UserFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUpdatedAt($value)
 */
	class User extends \Eloquent {}
}

