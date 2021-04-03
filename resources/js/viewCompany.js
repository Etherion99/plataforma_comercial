function pickPhoto() {
    const sourceImage = $(this).css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
    console.log(sourceImage);
    $('#imgInModal').attr('src', sourceImage);
    $('#viewPhotosModal').modal('show');
}

function showStateToday() {
    let actualDate = new Date();
    $('#collapseSchedule th').removeClass('main-color');
    $('#day-' + actualDate.getDay()).siblings('th').addClass('main-color');
    let open = false;
    let closeSchedule = '';
    schedules[actualDate.getDay()].forEach(element => {
        const year = actualDate.getFullYear(), month = actualDate.getMonth() + 1, day = actualDate.getDate(),
            horas = actualDate.getHours(), minutos = actualDate.getMinutes(),
            todayTimeStamp = new Date(day + '/' + month + '/' + year + ' ' + horas + ':' + minutos).getTime();
        const i = new Date(day + '/' + month + '/' + year + ' ' + element.start).getTime();
        const f = new Date(day + '/' + month + '/' + year + ' ' + element.end).getTime();
        if (todayTimeStamp >= i && todayTimeStamp <= f) {
            open = true;
            closeSchedule = element.end;
        }
    });
    let but = '';
    but = $('<div>').html(
        $('<span>').text(
            'HOY, cierra a las ' + closeSchedule +' '
        )
    ).append(
        $('<div>', {
            'class': 'd-inline-block viewUniqueSchedule text-success'
        }).text(
            'Abierto'
        )
    );
    if (!open) {
        but = $('<div>').html(
            $('<span>').text('HOY ')
        ).append(
            $('<div>', {
                'class': 'd-inline-block viewUniqueSchedule text-danger'
            }).text(
                'Cerrado'
            )
        );
    }
    $('#todaySchedule').html(but);
    setTimeout(showStateToday, 40000);
}

function updateScheduleNow() {
    schedules.forEach((element, index) => {
        if (schedules[index].length !== 0) {
            $('#day-' + index).html("");
            schedules[index].forEach(element => {
                $('#day-' + index).append(
                    $('<div>', {
                        'class': 'd-inline-block viewUniqueSchedule mr-1'
                    }).text(element.start + "-" + element.end)
                );
            });
        }
    });
    showStateToday();
}

$(document).ready(function () {
    $('.photo').click(pickPhoto);
    updateScheduleNow();
})
