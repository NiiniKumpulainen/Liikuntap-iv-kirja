import styles from './Stats.module.scss';
import { ResponsiveContainer, Tooltip, XAxis, YAxis, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, BarChart, Bar } from 'recharts';

function Stats(props) {
    const locale = "fi-FI";

    const minuteFormatter = new Intl.NumberFormat(locale, { style: 'unit', unit: 'minute' });

    const linedata = props.data
        .map((item) => {
            const amount = Number(item.amount);
            return {
                date: new Date(item.date).getTime(),
                amount: isNaN(amount) || !isFinite(amount) ? null : amount,
                key: item.id,
            };
        })
        .filter((item) => item.amount !== null);

    const totalAmount = props.data.reduce((sum, item) => {
        const amount = Number(item.amount);
        return isNaN(amount) || !isFinite(amount) ? sum : sum + amount;
    }, 0);

    const radarData = props.data.map(item => ({
        subject: item.type,
        amount: Number(item.amount),
        fullMark: 150,
    }));

    return (
        <div className={styles.stats}>
            <h2>Tilastot</h2>

            {/* Tutkakaavio */}
            <h3>Liikuntalajien vertailu</h3>
            <ResponsiveContainer height={350}>
                <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis tickFormatter={value => minuteFormatter.format(value)} />
                    <Radar name="Liikuntalajit" dataKey="amount" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Tooltip formatter={value => [minuteFormatter.format(value), "urheilu suoritettu"]} />
                </RadarChart>
            </ResponsiveContainer>

            {/* Pylväskaavio */}
            <h3>Liikuntasuoritukset päivittäin</h3>
            <ResponsiveContainer height={350}>
                <BarChart data={linedata}>
                    <XAxis
                        dataKey="date"
                        tickFormatter={(value) => {
                            return new Intl.DateTimeFormat(locale, {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                            }).format(value);
                        }}
                    />
                    <YAxis tickFormatter={value => minuteFormatter.format(value)} />
                    {/* MUOKATTU TOOLTIP TÄSSÄ */}
                    <Tooltip
                        labelFormatter={(value) => {
                            return new Intl.DateTimeFormat(locale, {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                            }).format(value);
                        }}
                        formatter={(value, name) => {
                            if (name === 'amount') {
                                return [minuteFormatter.format(value), 'Kesto'];
                            }
                            return value;
                        }}
                    />
                    <Bar dataKey="amount" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>

            {/* Näytetään kokonaismäärä minuutteina */}
            <p>Kokonaismäärä: {minuteFormatter.format(totalAmount)}</p>
        </div>
    );
}

export default Stats;